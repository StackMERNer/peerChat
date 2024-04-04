let localStream;
let remoteStream;
console.log("hellox");
// let init = async () => {
//   localStream = await navigator.mediaDevices.getUserMedia({ video: true });

//   document.getElementById("user-1").srcObject = localStream;
// };

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
  } catch (error) {
    console.error("Error accessing user media:", error);
  }
};

init();

init();
