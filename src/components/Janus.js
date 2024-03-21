import * as Janus from 'janus-gateway-js';
 

const Try = () => {


    let address = 'ws://tetonai.duckdns.org:8188';

    const janus = new Janus.Client(address, { keepalive: true });

    var config = {
        iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
      };

    const startJanus = async () => {
        const connection = await janus.createConnection('client2');
        const session = await connection.createSession();
        const plugin = await session.attachPlugin('janus.plugin.audiobridge');
        plugin.on('message', (message) => { console.log("msg: ", message); }); // For debugging
        // plugin.on('pc:track:remote', (message) => { 
        //     // adapter.browserShim.attachMed iaStream(audio, message.streams[0]);
        //     //console.log("message", message);
        // });
        const resp = await plugin.join(1234, { display: "Qiqi-browser" });
        console.log("resp", resp);
        //const resp2 = await plugin.connect(1234);
        //console.log("resp2", resp2);

        const stream = await plugin.getUserMedia({ audio: true, video: false });
        const response = await plugin.offerStream(stream);
        console.log("OFFERSTREAM RESPONSE", response);

        const peerConnections = plugin.getPeerConnection();
        console.log("peerconnections", peerConnections);

//         peerConnections.onicecandidate(ice => {
//             console.log("ice", ice);
// ;        })

    }
    

    

    return (
        <div>
            <button onClick={startJanus}>Join room</button>
            <audio id="audio" autoPlay={true}></audio>
        </div>
    );
}

export default Try;

