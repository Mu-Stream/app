export async function createIceCandidate(socket: WebSocket) {
  return new Promise<RTCPeerConnectionIceEvent["candidate"]>((resolve, reject) => {
    console.log('PROMISU')
    console.log(RTCPeerConnection)
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302"
        },
      ],
    });

    pc.onicecandidate = (event) => {
      resolve(event.candidate)
    }

    pc.onicecandidateerror = (_) => {
      console.log('NOPE')
      reject()
    }
    pc.createOffer().then(console.log);
  });
}
