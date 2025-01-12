import RegisterForm from "@/features/Auth/Register/RegisterForm";

function Register() {
  return (
    <div className="flex h-screen">
      {/* Left Side: Image */}
      <div className="flex-1  md:block hidden ">
        <img
          src="/signup.svg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
        <RegisterForm />
      </div>
    </div>
  );
}

export default  Register
