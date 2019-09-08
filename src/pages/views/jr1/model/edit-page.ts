import { Exclude, Expose } from 'class-transformer'
@Exclude()
export default class EditPage {
  @Expose()
  public form: {title: string} = { title: '' }
  @Expose()
  public viewType: string = 'edit'
}

