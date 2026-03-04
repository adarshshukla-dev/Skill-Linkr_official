import { Instagram, Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: (
      <a
        href="https://www.mitmuf.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-600 hover:underline"
      >
        Meerut Udyami Foundation
        
      </a>
    ),
    image:
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745487634/MUF_LOGO_MAIN_n0vdma.png",
      description:
      "StartInUP & MSME Recognized Agri-Business Incubator Hosted by MIT Meerut",
  },
  {
    name: (
      <a
        href="https://mitmeerut.net.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-600 hover:underline"
      >
        Meerut Institute of Technology, Meerut 
      </a>
    ),
    image:
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745755233/Blue_Minimalist_Air_Plane_Travel_Logo_200_x_200_px_ue0ghe.jpg",
    description:
      "Host Institution",
  },
  
];

export default function Supporters() {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Our Affiliations
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
          We're proud to be supported by leading organizations and individuals
          who believe in our mission.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
  {teamMembers.map((member, index) => (
    <div
      key={index}
      className="group gap-10 light:bg-white  border border-gray-200 dark:border-white dark:bg-sky-400 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center"
    >
      {/* Increased image size */}
      <img
        src={member.image}
        alt="Team member"
        className="mx-auto mb-4 h-20 w-20 rounded-full object-cover  group-hover:scale-105 transition-transform duration-300"
      />
      <h3 className="text-2xl font-semibold text-sky-500 dark:text-white mb-1">
        {member.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-2sm ">
        {member.description}
      </p>
    </div>
  ))}
</div>

    </section>
  );
}
