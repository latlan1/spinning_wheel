import https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
import https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.7.0/dist/web3.min.js
import https://cdn.jsdelivr.net/npm/@web3auth/web3auth@0.2.2/dist/web3auth.umd.min.js"

const web3authSdk = window.Web3auth
let web3AuthInstance = null;

(async function init() {
    $("#logout").hide();

    web3AuthInstance = new web3authSdk.Web3Auth({
        chainConfig: { chainNamespace: "eip155" },
        clientId: "BCZrf8xogAezjWJshKyOMN3AY6GaN5G_2-h2gQY8XvLYS-WemnGzxe9EcoNo7dV-Vj4SW9O_rUCLslX3Bz8w4AY" // inserted clientId from Discord 
    });


    subscribeAuthEvents(web3AuthInstance)

    await web3AuthInstance.initModal();
    console.log("web3AuthInstance", web3AuthInstance, web3AuthInstance.provider)
    if (web3AuthInstance.provider) {
        const user = await web3AuthInstance.getUserInfo();
        $("#text").text("Logged in as " + user.name + ".");
        $("#logout").show();
        await initWeb3();
    } else {
        $("#text").text("Didn't log in.");
        $("#login").show();
    }
})();

function subscribeAuthEvents(web3auth) {
    web3auth.on("connected", (data) => {
        console.log("Yeah!, you are successfully logged in", data);

    });

    web3auth.on("connecting", () => {
        console.log("connecting");
    });

    web3auth.on("disconnected", () => {
        console.log("disconnected");
    });

    web3auth.on("errored", (error) => {
        console.log("some error or user have cancelled login request", error);
    });

    web3auth.on("MODAL_VISIBILITY", (isVisible) => {
        console.log("modal visibility", isVisible)
    });
}


async function initWeb3() {
    const web3 = new Web3(web3AuthInstance.provider);
    const address = (await web3.eth.getAccounts())[0];
    const balance = await web3.eth.getBalance(address);
    $("#address").text("Address: " + address + ".");
    $("#balance").text("Balance: " + balance + ".");
}

$("#login").click(async function (event) {
    try {
        const provider = await  web3AuthInstance.connect()
        console.log("provider after login", provider)
        await initWeb3();
        const user = await web3AuthInstance.getUserInfo();
        $("#text").text("Logged in as " + user.name + ".");
        $("#error").hide();
        $("#logout").show();
        $("#login").hide();
    } catch (error) {
        $("#error").text(error.message);
    }
});

$("#logout").click(async function (event) {
    try {
        await web3AuthInstance.logout()
        $("#text").text("Logged out.");
        $("#address").text("");
        $("#balance").text("");
        $("#login").show();
        $("#logout").hide();
    } catch (error) {
        $("#error").text(error.message);
    }

});
