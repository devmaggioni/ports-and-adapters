import NameVO from "@domain/value-objects/name.vo";

export default class User {
  name: NameVO;
  constructor(props: { name: NameVO }) {
    this.name = props.name;
  }
}
