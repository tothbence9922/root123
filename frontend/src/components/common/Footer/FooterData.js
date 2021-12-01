import { FaGithub, FaUserAlt } from 'react-icons/fa';


const FooterData = {
    sections: [
        {
            name: "The team",
            links: [
                {
                    name: "Lupták György",
                    icon: <FaGithub />,
                    to: "https://github.com/gyorgyluptak",
                },
                {
                    name: "Tóth Bence",
                    icon: <FaGithub />,
                    to: "https://github.com/tothbence9922",
                },
                {
                    name: "Tóth Vince",
                    icon: <FaGithub />,
                    to: "https://github.com/vincet97",
                },
                {
                    name: "Veres Csaba",
                    icon: <FaGithub />,
                    to: "https://github.com/Vecsami",
                },
            ],
        },
        {
            name: "The project",
            links: [
                {
                    name: "root123",
                    icon: <FaGithub />,
                    to: "https://github.com/tothbence9922/root123",
                },
                
            ],
        }
    ]
}

export default FooterData;