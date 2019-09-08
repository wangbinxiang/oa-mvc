import Person from './Person'

export default class PersonPage {

  public isLoading: boolean = true;

  public persons: Person[] | undefined;

  public pageNum: number = 0;

  public pageSize: number = 10;
}
