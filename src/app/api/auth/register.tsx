import React, { useState } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa'; // Import icons
import form_img from '../../../../public/asset/images/Welcome.svg';
import person from '../../../../public/asset/images/Illustration.svg';
import { Button } from '@/app/shared/ui/Button';

type RegisterProps = {
  Register: (
    username: string,
    password: string,
    email: string,
    phone: string
  ) => void;
};

const RegisterForm: React.FC<RegisterProps> = ({ Register }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Register(username, password, email, phone);
  };

    return (
    <>
      <section className="relative">
        <div className="absolute top-[50%] right-[0px] transform -translate-x-[0%] -translate-y-[-29%] w-[150px] h-[80px] bg-btn-color blur-[100px] z-0"></div>
        <div className="absolute top-[50%] left-[0px] transform -translate-x-[0%] -translate-y-[-29%] w-[150px] h-[80px] bg-[#32CAFD] blur-[100px] z-0"></div>

        <div className="container relative mx-auto text-white flex justify-center items-center gap-3 p-12 rounded-[20px]">
          <div className="welcome_img">
            <Image src={form_img} width={600} alt="register img" />
          </div>

          <div className="bg-card-color w-[600px] h-[800px] rounded-[60px] p-3 flex flex-col justify-center items-center relative">
            <div className="bg-text-gradient bg-clip-text text-4xl font-semibold text-transparent p-6 mb-3">
              <h2>Register To Join With Us</h2>
            </div>
            <div className="welcome_img relative">
              <Image src={person} width={400} alt="register img" />
            </div>
            <div className="absolute top-[8%] right-[50px] transform -translate-x-[11%] -translate-y-[-29%] w-[150px] h-[80px] bg-btn-color blur-[100px] z-0"></div>
            <div className="absolute top-[8%] left-[50px] transform -translate-x-[-11%] -translate-y-[-29%] w-[150px] h-[80px] bg-[#32CAFD] blur-[100px] z-0"></div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 justify-center items-center relative"
            >
              <div className="relative w-[500px]">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full outline-none border-[1px] border-[#949494] bg-card-color p-3 pl-10 rounded-[10px]"
                />
              </div>

              <div className="relative w-[500px]">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none border-[1px] border-[#949494] bg-card-color p-3 pl-10 rounded-[10px]"
                />
              </div>

              <div className="relative w-[500px]">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full outline-none border-[1px] border-[#949494] bg-card-color p-3 pl-10 rounded-[10px]"
                />
              </div>

              <div className="relative w-[500px]">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none border-[1px] border-[#949494] bg-card-color p-3 pl-10 rounded-[10px]"
                />
              </div>

              <Button type={"submit"} theme={"primary"} classname="w-full">
                Register
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
