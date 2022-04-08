const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");
const connectionString = "DefaultEndpointsProtocol=https;AccountName=azuretpenzo;AccountKey=NBjliVocWlXu0ICMvhGtuPTK30lKlO+O2XdXSvu8+g20UueWJZhFcM/zQHi0bGwwSwHP/HdhhIRW+ASt2gDl4w==;EndpointSuffix=core.windows.net";
const queueName = "enzoqueue";

console.log("Création de la queue: ", queueName);

const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
const queueClient = queueServiceClient.getQueueClient(queueName);

messageText = "first message ";

setInterval(function() {
    messageText = "Hello world";
    console.log("Ajout 'un message avec un interval", messageText );
    queueClient.sendMessage(messageText);
}, 8000)

async function peekMessageUser1(){
        const peekedMessages = await queueClient.peekMessages({ numberOfMessages: 1 });
        for (i = 0; i < peekedMessages.peekedMessageItems.length; i++) {
            console.log("Peeked message: ", peekedMessages.peekedMessageItems[i].messageText);
        }
}

setInterval(function(){
    peekMessageUser1();
}, 3000)


async function dequeueMessageUser2(){
    receivedMessages = await queueClient.receiveMessages();
    var message = receivedMessages.receivedMessageItems[0];

    console.log("Dequeuing message: ", message.messageText);

    await queueClient.deleteMessage(message.messageId, message.popReceipt);
}

setInterval(function(){
    dequeueMessageUser2();
}, 8000)