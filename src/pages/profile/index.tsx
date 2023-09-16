import { useSession } from "next-auth/react";

interface SessionData {
  user?: {
    email?: string;
    image?: string;
    fullname?: string;
  };
  expires : string;
}

const ProfilePage: React.FC = () => {
  const { data: session } = useSession<SessionData>(); // Provide the custom SessionData type

  const userFullname = session?.user?.fullname;
  console.log(userFullname);

  return (
    <div>
      <div className="flex flex-col font-poppins px-3">
        <div className="mt-12 px-4 md:px-8 py-2 flex justify-between">
          <p>home / MyAccount</p>
          <p>
            welcome{" "}
            <span className="text-secondary">{session?.user?.fullname}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
