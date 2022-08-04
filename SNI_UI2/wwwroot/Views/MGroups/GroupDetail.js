class GroupDetail  extends HTMLElement {
    constructor() { super(); }
    connectedCallback() { this.DrawGroupDetail(); }
    DrawGroupDetail = async () => {  }
}
customElements.define('w-groupdetail', GroupDetail);
export { GroupDetail }