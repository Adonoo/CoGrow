export const CHANNEL_NAME = "cogrow_sync_v1";

let channel = null;

function getChannel() {
  if (!channel) channel = new BroadcastChannel(CHANNEL_NAME);
  return channel;
}

export function broadcastState(state) {
  getChannel().postMessage(state);
}

export function subscribeToState(onState) {
  const ch = getChannel();

  const handler = (event) => {
    onState(event.data);
  };

  ch.addEventListener("message", handler);

  // return unsubscribe
  return () => ch.removeEventListener("message", handler);
}
