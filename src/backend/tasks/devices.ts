/* eslint-disable @typescript-eslint/no-explicit-any */
import ip from "ip";

export const devicesArray: string[] = [];

export const Get = async () => {
  const localIP = ip.address();
  const localIPPartial = localIP.toString().substring(0, localIP.length - 1);
  const isPrivate = ip.isPrivate(localIP);

  let subnet: ip.SubnetInfo | null = null;

  if (isPrivate && ip.isV4Format(localIP) == true) {
    subnet = ip.subnet(localIPPartial + "0", localIPPartial + "255");
  }

  if (typeof window !== "undefined") {
    const fetchDeviceResponse = async () => {
      if (subnet !== null) {
        for (
          let i = ip.toLong(subnet.firstAddress);
          i < ip.toLong(subnet.lastAddress) + 1;
          i++
        ) {
          const currentIP = ip.fromLong(i);
          devicesArray.push(currentIP);
        }
      }
    };
    fetchDeviceResponse();
  }
  return devicesArray;
};

export const Check = async () => {
  if (devicesArray.length < 1) {
    await Get();
  }
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const invoke = require("@tauri-apps/api").invoke;
    return invoke("fetch_devices", {
      ipAddresses: devicesArray,
    })
      .then((res: any) =>
        console.log(`Message: ${res.message}, Other Val: ${res.other_val}`)
      )
      .catch((e: any) => console.error("CheckError:", e));
  }
};
