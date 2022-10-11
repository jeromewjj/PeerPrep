const registerConnectionHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  io.on("connection", async (socket) => {
    socket.on(
      "clientConnected",
      async ({ socketId, userId }) =>
        await clientConnectedEvent(defaultParams, socketId, userId)
    );

    socket.on(
      "clientDisconnected",
      async ({ userId }) => await clientDisconnectedEvent(defaultParams, userId)
    );

    socket.on(
      "findMatch",
      async ({ difficulty, userId }) =>
        await findMatchEvent(defaultParams, difficulty, userId)
    );

    socket.on(
      "sendLanguage",
      async ({ roomId, language }) =>
        await sendLanguage(defaultParams, roomId, language)
    );

    socket.on(
      "sendCurrentCode",
      async ({ roomId, code }) =>
        await sendCollaborationCode(defaultParams, roomId, code)
    );

    socket.on(
      "sendDrawing",
      async ({ roomId, strokeData }) =>
        await sendDrawing(defaultParams, roomId, strokeData)
    );

    socket.on(
      "sendUndoDrawing",
      async ({ roomId }) => await sendUndoDrawing(defaultParams, roomId)
    );

    socket.on(
      "sendRedoDrawing",
      async ({ roomId }) => await sendRedoDrawing(defaultParams, roomId)
    );

    socket.on(
      "sendClearDrawing",
      async ({ roomId }) => await sendClearDrawing(defaultParams, roomId)
    );

    socket.on(
      "sendMessage",
      async ({ roomId, messageId, name, message, time }) =>
        await sendMessageEvent(
          defaultParams,
          roomId,
          messageId,
          name,
          message,
          time
        ) //todo
    );

    socket.on(
      "sendLeaveRoom",
      async ({ roomId }) => await sendLeaveRoom(defaultParams, roomId)
    );
  });
};

const clientConnectedEvent = async (defaultParams, socketId, userId) => {
  const [io, pubClient, subClient] = defaultParams;
  await pubClient.hSet("userSocketMap", userId, socketId);
};

const clientDisconnectedEvent = async (defaultParams, userId) => {
  const [io, pubClient, subClient] = defaultParams;
  await pubClient.hDel("userSocketMap", userId);
};

const findMatchEvent = async (defaultParams, difficulty, userId) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ difficulty, userId });
  await pubClient.publish("findMatch", data);
};

const sendLanguage = async (defaultParams, roomId, language) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId, language });
  await pubClient.publish("sendLanguage", data);
};

const sendCollaborationCode = async (defaultParams, roomId, code) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId, code });
  await pubClient.publish("sendCurrentCode", data);
};

const sendDrawing = async (defaultParams, roomId, strokeData) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId, strokeData });
  await pubClient.publish("sendDrawing", data);
};

const sendUndoDrawing = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId });
  await pubClient.publish("sendUndoDrawing", data);
};

const sendRedoDrawing = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId });
  await pubClient.publish("sendRedoDrawing", data);
};

const sendClearDrawing = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId });
  await pubClient.publish("sendClearDrawing", data);
};

//TODO handle frontent to gateway
const sendMessageEvent = async (
  defaultParams,
  roomId,
  messageId,
  name,
  message,
  time
) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId, messageId, name, message, time });
  await pubClient.publish("sendMessage", data);
};

const sendLeaveRoom = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId });
  await pubClient.publish("sendLeaveRoom", data);
};

export { registerConnectionHandlers };
