/* eslint-disable @typescript-eslint/no-explicit-any */
import ip from "ip";

const get = async () => {
  const localIP = ip.address();
  const localIPPartial = localIP.toString().substring(0, localIP.length - 1);
  const isPrivate = ip.isPrivate(localIP);

  const devicesArray: string[] = [];

  let subnet: ip.SubnetInfo | null = null;

  if (isPrivate && ip.isV4Format(localIP) == true) {
    subnet = ip.subnet(localIPPartial + "0", localIPPartial + "255");
  }

  if (typeof window !== "undefined") {
    const checkDevice = (ip: string) => {
      fetch(ip, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      })
        .then((response) => response.text())
        .then(async (responseText) => {
          if (responseText.includes("url=/iungo/app")) {
            devicesArray.push(ip);
          } else {
            return;
          }
        })
        .catch(() => {
          return;
        });
    };

    if (subnet !== null) {
      for (
        let i = ip.toLong(subnet.firstAddress);
        i < ip.toLong(subnet.lastAddress) + 1;
        i++
      ) {
        const currentIP = ip.fromLong(i);
        checkDevice(currentIP);
      }
    }
  }
  return devicesArray;
};
get();
