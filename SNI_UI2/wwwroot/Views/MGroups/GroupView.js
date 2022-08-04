class GroupView  extends HTMLElement {
    constructor() { super(); }
    connectedCallback() { this.DrawGroupView(); }
    DrawGroupView = async () => {  }
}
customElements.define('w-groupview', GroupView);
export { GroupView }