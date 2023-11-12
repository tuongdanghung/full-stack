import React from "react";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BsFillPinMapFill } from "react-icons/bs";

type Props = {};

const Contact = (props: Props) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="border border-collapse p-4">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5575437606085!2d108.20760201120245!3d16.036532084574173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142199388f2bd49%3A0xd9a4963781c02c50!2zMzYzIE5ndXnhu4VuIEjhu691IFRo4buNLCBLaHXDqiBUcnVuZywgQ-G6qW0gTOG7hywgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1699805504546!5m2!1svi!2s"
                    width="510"
                    height="250"
                    loading="lazy"
                ></iframe>
            </div>
            <div className="border border-collapse p-4">
                <p>
                    Sed vestibulum faucibus felis, sit amet facilisis tellus.
                    Aliquam erat volutpat. Sed consectetur ipsum velit, quis
                    rhoncus libero egestas eget.
                </p>
                <ul>
                    <li className="flex mt-4 items-center">
                        <BsFillPinMapFill className="text-red-500" />
                        <span className="ml-3">
                            363 Nguyễn Hữu Thọ Khuê Trung Cẩm Lệ Đà Nẵng 550000
                        </span>
                    </li>
                    <li className="flex mt-2 items-center">
                        <AiFillPhone className="text-red-500" />
                        <span className="ml-3">096437282</span>
                    </li>
                    <li className="flex mt-2 items-center">
                        <AiOutlineMail className="text-red-500" />
                        <a
                            className="ml-3"
                            href="mailto:tuongdanghung37@gmail.com"
                        >
                            tuongdanghung37@gmail.com
                        </a>
                    </li>
                    <li>
                        <span> Opening hours</span>
                        <ul>
                            <li>Mon-Fri : 11.00 - 20.00</li>
                            <li>Sat: 10.00 - 20.00</li>
                            <li>Sun: 19.00 - 20.00</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Contact;
