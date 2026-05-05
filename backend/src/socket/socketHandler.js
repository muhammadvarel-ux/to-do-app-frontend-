/**
 * Socket.io event handlers.
 * Handles join-board, leave-board, task-created, task-updated, task-deleted events.
 * Implements room management and broadcasts events to board members.
 *
 * @param {import('socket.io').Server} io
 */
const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id} (userId: ${socket.userId})`);

    /**
     * Join a board room.
     * Emits 'user-joined' to all other members in the room.
     *
     * @event join-board
     * @param {{ boardId: string }} data
     */
    socket.on('join-board', ({ boardId }) => {
      if (!boardId) return;

      socket.join(boardId);
      console.log(`Socket ${socket.id} (userId: ${socket.userId}) joined board: ${boardId}`);

      // Notify other members in the room that this user joined
      socket.to(boardId).emit('user-joined', { userId: socket.userId });
    });

    /**
     * Leave a board room.
     * Emits 'user-left' to all other members in the room.
     *
     * @event leave-board
     * @param {{ boardId: string }} data
     */
    socket.on('leave-board', ({ boardId }) => {
      if (!boardId) return;

      socket.leave(boardId);
      console.log(`Socket ${socket.id} (userId: ${socket.userId}) left board: ${boardId}`);

      // Notify other members in the room that this user left
      socket.to(boardId).emit('user-left', { userId: socket.userId });
    });

    /**
     * Broadcast task-created event to all other board members.
     *
     * @event task-created
     * @param {{ task: object, boardId: string }} data
     */
    socket.on('task-created', ({ task, boardId }) => {
      if (!boardId || !task) return;

      console.log(`Socket ${socket.id} (userId: ${socket.userId}) created task on board: ${boardId}`);

      // Broadcast to all other members in the room (excluding sender)
      socket.to(boardId).emit('task-created', { task });
    });

    /**
     * Broadcast task-updated event to all other board members.
     *
     * @event task-updated
     * @param {{ task: object, boardId: string }} data
     */
    socket.on('task-updated', ({ task, boardId }) => {
      if (!boardId || !task) return;

      console.log(`Socket ${socket.id} (userId: ${socket.userId}) updated task on board: ${boardId}`);

      // Broadcast to all other members in the room (excluding sender)
      socket.to(boardId).emit('task-updated', { task });
    });

    /**
     * Broadcast task-deleted event to all other board members.
     *
     * @event task-deleted
     * @param {{ taskId: string, boardId: string }} data
     */
    socket.on('task-deleted', ({ taskId, boardId }) => {
      if (!boardId || !taskId) return;

      console.log(`Socket ${socket.id} (userId: ${socket.userId}) deleted task ${taskId} on board: ${boardId}`);

      // Broadcast to all other members in the room (excluding sender)
      socket.to(boardId).emit('task-deleted', { taskId });
    });

    /**
     * Handle socket disconnection.
     */
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id} (userId: ${socket.userId})`);
    });
  });
};

module.exports = socketHandler;
