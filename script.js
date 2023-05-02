const MoodContractAddress = "0x87Cc869c9158fD016f480b0f235d351C050d31cA";
const MoodContractABI = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_mood",
                type: "string",
            },
        ],
        name: "setMood",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getMood",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]

window.ethereum.enable();

let MoodContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum)

provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0])
    MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
    )
})

async function getMood() {
    const Mood = await MoodContract.getMood()
    document.getElementById("showMood").innerText = `Your Mood: ${Mood}`
    console.log(Mood)
}

async function setMood() {
    const mood = document.getElementById("mood").value
    const moodChanged = await MoodContract.setMood(mood)
    console.log(moodChanged)
    return moodChanged
}
