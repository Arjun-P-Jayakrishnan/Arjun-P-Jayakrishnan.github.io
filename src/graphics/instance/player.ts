export interface PlayerProps {
  ids: {
    rootMesh: string;
  };
}

export interface Player {
  update: (deltaTime: number) => void;
}

export const createPlayer = (props: PlayerProps): Player => {
  const update = (deltaTime: number) => {};

  return {
    update: update,
  };
};
