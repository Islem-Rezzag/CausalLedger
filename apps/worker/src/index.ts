export type WorkerBootstrap = {
  readonly app: "worker";
  readonly jobs: readonly [];
};

export function createWorkerBootstrap(): WorkerBootstrap {
  return {
    app: "worker",
    jobs: [],
  };
}
