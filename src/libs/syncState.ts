import { BroadcastChannel, createLeaderElection } from 'broadcast-channel'

async function syncState(nameChannel: string) {
    const channel = new BroadcastChannel(nameChannel)
    const elector = createLeaderElection(channel)

    let hasLeader = await elector.hasLeader()
    console.log(hasLeader)
    elector.awaitLeadership().then(() => {
        console.log("IM LEADER")
    });

    // console.log(isLeader)

}


export default syncState