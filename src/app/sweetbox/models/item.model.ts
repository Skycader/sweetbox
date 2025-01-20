export interface ItemModelInterface {
  title: string;
  image: string; //image of the prize
  sound: string; //path to file with sound
  type: 'common' | 'rare' | 'legendary';
}

export interface CardModelInterface extends ItemModelInterface {
  amount: number; //the amount of prize
  isRemoved: boolean; //removed up after seeing the card
  isTaken: boolean; //is the card taken from the package
  isShowingTitle: boolean; //the name of the prize
}
