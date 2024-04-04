let localStream;
let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

let init = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    // Handle case where getUserMedia is not supported
    console.error("getUserMedia is not supported in this browser");
    return;
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");

    if (cameras.length === 0) {
      // Handle case where no camera devices are available
      console.error("No camera devices found");
      alert("No camera found on this device!");
      return;
    }

    // Access the first available camera device
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    document.getElementById("user-1").srcObject = localStream;
    createOffer();
  } catch (error) {
    console.error("Error accessing user media:", error);
  }
};

let createOffer = async () => {
  peerConnection = new RTCPeerConnection(servers);

  remoteStream = new MediaStream();
  document.getElementById("user-2").srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack();
    });
  };

  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  console.log("offer", offer);
};

init();
