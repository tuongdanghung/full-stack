const Banner = () => {
    return (
        <div className="mt-6 grid grid-cols-2 gap-5 customer-care p-6 bg-white border border-collapse rounded-md banner-head">
            <div></div>
            <div className="text-banner">
                <p className="text-4xl font-bold mb-3">Products coming soon</p>
                <span>
                    iPhone 15 Series: iPhone 15, iPhone 15 mini, iPhone 15 Pro,
                    and iPhone 15 Pro Max. This is the next version of the
                    iPhone line with improvements in performance, camera and
                    battery life. They feature sleek designs, OLED screens, the
                    latest iOS operating system, and the ability to take
                    high-quality photos and videos. <br />
                    The new iPad is powered by an A13 Bionic chip, a large
                    Retina display, and Apple Pencil support. It offers a better
                    entertainment and work experience with fast performance and
                    multitasking capabilities
                </span>
                <br />
                <button className="mt-6 border px-4 py-2 rounded bg-black hover:bg-blue-gray-300">
                    Know here
                </button>
            </div>
        </div>
    );
};

export default Banner;
