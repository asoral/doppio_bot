frappe.pages["frappe-chatgpt"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "FrappeGPT",
    single_column: true,
  });

  // hot reload in development
  if (frappe.boot.developer_mode) {
    frappe.hot_update = frappe.hot_update || [];
    frappe.hot_update.push(() => load_chatgpt_ui(wrapper));
  }
};

frappe.pages["frappe-chatgpt"].on_page_show = function (wrapper) {
  load_chatgpt_ui(wrapper);
};

function load_chatgpt_ui(wrapper) {
  let route = frappe.get_route();
  let $parent = $(wrapper).find(".layout-main-section");
  $parent.empty();

  frappe.require("chatgpt_ui.bundle.jsx").then(() => {
    frappe.chatgpt_ui = new chatgpt.ui.ChatGptUI({
      wrapper: $parent,
      page: wrapper.page,
    });
  });
}
