import Link from "next/link";

export default function SignUpConfirmaionModal() {
  return (
    <div className="modal 7-20" id="signup-modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Your account has been successfully created.
        </h3>
        <p className="py-4">
          Please check your email and click on the confirmation link. Check the
          spam in case email is not found. It can take upto 5 min to send the
          email.
        </p>
        <div className="modal-action">
          <Link
            href="/login"
            className="btn btn-success"
            onClick={() => {
              document
                .querySelector(".custom-backdrop-loader")
                .classList.toggle("active");
            }}
          >
            I have confirmed my email
          </Link>
        </div>
      </div>
    </div>
  );
}
