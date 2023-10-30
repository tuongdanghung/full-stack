import { useState } from "react";
import { apiFinalRegister } from "../../../../apis";
import Swal from "sweetalert2";
const Dialog = (props: any) => {
  const [token, setToken] = useState("");
  const finalRegister = async () => {
    props.setCheckShow(false);
    const response = await apiFinalRegister(token);
    if ((response as any).data.success) {
      Swal.fire(
        "Congratulations!",
        (response as any).data.message,
        "success"
      ).then(() => {
        setToken("");
      });
    } else Swal.fire("Oops!", (response as any).data.message, "error");
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 w-[450px]">
        <h4>Enter your code</h4>
        <input
          type="text"
          className="border"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          onClick={finalRegister}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Dialog;
