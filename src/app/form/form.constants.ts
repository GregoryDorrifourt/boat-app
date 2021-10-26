export enum STEP {
  OWNER= '/create',
  TYPE= '/create/type',
  DESCRIPTION = '/create/description',
  SUCCESS= '/create/success'
}

export const imgUrlRegEx = '(http|https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*(.jpg|.png)/?';
