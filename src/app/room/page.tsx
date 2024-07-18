"use client";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { useSearchParams } from "next/navigation";
import * as React from "react"
 import Image from 'next/image';
 import staticImage from '../../../../public/images/pexels-abdulwahab-alawadhi-5063630.jpg'
import { Button } from "@/components/ui/button"

export default function Page() {
  const params = useSearchParams();

  useEffect(() => {
    const room = params.get("room");
    const name = params.get("name");
    if (room && name) {
      setRoom(room);
      setName(name);
    }
  }, [params]);

  const [room, setRoom] = useState<string>();
  const [name, setName] = useState<string>();

  const [token, setToken] = useState("");

  async function getToken() {
    if (!room || !name) {
      return;
    }
    try {
      const resp = await fetch(
        `/api/get-participant-token?room=${room}&username=${name}`
      );
      const data = await resp.json();
      setToken(data.token);
    } catch (e) {
      console.error(e);
    }
  }

  if (token === "") {
    return (
      <div className="bg-workspace-gray flex justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center w-full h-full">

            <form
              onSubmit={(e) => {
                e.preventDefault();
                getToken();
              }}
              className="flex flex-col  justify-center items-center"
            >
              <input
                type="text"
                placeholder="Enter Room Code..."
                value={room}
                className="mb-4 bg-custom-zinc text-black border-none rounded-lg ring-1 px-3 py-2 ring-gray-300"
                onChange={(e) => setRoom(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter room name..."
                value={name}
                className="mb-4 ring-1 bg-custom-zinc text-black rounded-lg px-3 py-2 ring-gray-300"
                onChange={(e) => setName(e.target.value)}
              />
              <button
                type="submit"
                className="py-3 px-24 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Join
              </button>
            </form>
      </div>
    </div>
    
    
    );
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      onDisconnected={() => setToken("")}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
    }

    function MyVideoConference() {
        // useTracks returns all camera and screen share tracks. If a user
        // joins without a published camera track, a placeholder track is returned.
        const tracks = useTracks(
          [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
          ],
          { onlySubscribed: false }
        );
        return (
          <GridLayout
            tracks={tracks}
            style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
          >
            <ParticipantTile />
          </GridLayout>
        );
      }