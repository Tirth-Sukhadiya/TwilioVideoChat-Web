import { connect, ConnectOptions, LocalTrack, Room } from 'twilio-video';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AuthToken {
    token: string;
}

export interface NamedRoom {
    id: string;
    name: string;
    maxParticipants?: number;
    participantCount: number;
}

export type Rooms = NamedRoom[];

@Injectable({
    providedIn: 'root'
})
export class VideoChatService {
    $roomsUpdated: Observable<boolean>;

    private roomBroadcast = new ReplaySubject<boolean>();

    constructor(private readonly http: HttpClient) {
        this.$roomsUpdated = this.roomBroadcast.asObservable();
    }

    private async getAuthToken() {
        const auth =
            await this.http
                .get<AuthToken>(`http://localhost:42945/api/video/token`)
                .toPromise();

        return auth.token;
    }

    getAllRooms() {
        return this.http
            .get<Rooms>('http://localhost:42945/api/video/rooms')
            .toPromise();
    }

    getNewRoom() {
        return this.http
            .get<NamedRoom>('http://localhost:42945/api/video/room');
    }

    async joinOrCreateRoom(name: string, tracks: LocalTrack[]) {
        let room: Room = null;
        try {
            const token = await this.getAuthToken();
            room =
                await connect(
                    token, {
                        name,
                        tracks,
                        dominantSpeaker: true
                    } as ConnectOptions);
        } catch (error) {
            console.error(`Unable to connect to Room: ${error.message}`);
        } finally {
            if (room) {
                this.roomBroadcast.next(true);
            }
        }

        return room;
    }

    nudge() {
        this.roomBroadcast.next(true);
    }
}
