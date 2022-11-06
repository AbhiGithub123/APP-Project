import toastr from "toastr";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import React from "react";
import "../../node_modules/toastr/build/toastr.css";


// Custom show Confirm
export const showConfirm = (obj) => {
  let text;
  const { data, list } = obj;
  if (data && Array.isArray(data) && data.length > 0) {
    text = `<div style="overflow-y: auto;max-height: 120px;">
${data.reduce((p, header) => p + `<b><li>${header}</li></b>`, "")}
</div>`;
  }
  if (list && Array.isArray(list) && list.length > 0) {
    text = `<div style="overflow-y: auto;max-height: 200px;">
${list
        .map(
          (ele) => `<br/><b>${ele.title}</b><br/>
 ${ele.list.map((header, index) => `<p> ${index + 1}. ${header}</p>`).join("")}`
        )
        .join("")}
</div>`;
  }
  return new Promise(function (resolve, reject) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div style={obj.width ? { width: obj.width } : null}>
            <div className="upperPart" style={{ background: "#c6c6e0" }}>
              <div className="react-confirm-alert">
                {/* close button for popup */}
                <div className="react-confirm-alert-body" style={{ color: "#084dab", background: "#d1d8f8", borderRadius: "0px" }}>
                  <h6>{obj.title}</h6>
                  <div
                    dangerouslySetInnerHTML={{ __html: text != undefined ? obj.msgText.concat(text) : obj.msgText }}
                  />
                </div>
              </div>

              <div className="lowerPart">
                {/* Cancel Button to close popup*/}
                {obj.closeButton ? (
                  <button
                    className="closeButton"
                    title="Close Alert"
                    onClick={() => {
                      resolve(undefined);
                      onClose();
                    }}
                  >
                    Cancel
                  </button>
                ) : null}

                <div className="react-confirm-alert-button-group">
                  {/* Back/Cancle Button */}
                  {obj.alertType == "ConfirmationAlerts" ? (
                    <button
                      className="backCancle"
                      onClick={() => {
                        resolve(false);
                        onClose();
                      }}
                    >
                      {obj.cancletext}
                    </button>
                  ) : null}

                  <button
                    className={`${obj.okTextClass}`}
                    onClick={() => {
                      resolve(true);
                      onClose();
                    }}
                  >
                    {obj.okText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  });
};



// Custom Showprompt

export const MessageTypes = {
  Error: "error",
  Info: "info",
  Success: "success",
  Warning: "warning"
};

export const showAlert = (msg) => {
  toastrAlert(msg);
};

export const toastrAlert = (msg) => {
  toastr.options = {
    newestOnTop: false,
    closeButton: true,
    preventDuplicates: true,
    positionClass: "toast-top-center",
    timeOut: msg.msg_type === MessageTypes.Error ? 6000 : 3000,
    extendedTimeOut: 5000,
    ...msg
  };

  switch (msg.msg_type) {
    case MessageTypes.Error: {
      const title = msg.title === undefined ? "Error" : msg.title;
      toastr.error(msg.msg_text, title);
      break;
    }
    case MessageTypes.Success: {
      const title = msg.title === undefined ? "Success" : msg.title;
      toastr.success(msg.msg_text, title);
      break;
    }
    case MessageTypes.Warning: {
      const title = msg.title === undefined ? "Warning" : msg.title;
      toastr.warning(msg.msg_text, title);
      break;
    }
    case MessageTypes.Info: {
      const title = msg.title === undefined ? "Info" : msg.title;
      toastr.info(msg.msg_text, title);
      break;
    }
    default: {
    }
  }
};