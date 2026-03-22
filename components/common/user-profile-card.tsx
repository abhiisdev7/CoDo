import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/hover-card"
import { BriefcaseBusiness, Globe, Mail } from "lucide-react"
import Link from "next/link"

export function UserProfileCard() {
  const user = {
    email: "abhiisdev7@example.com",
    fullName: "Abhilash Kumar",
    avatarUrl: "https://github.com/shadcn.png",
    about:
      "Passionate software engineer with 5+ years of experience building scalable web applications. Loves working with React and Bun Runtime",
    jobTitle: "Fullstack Developer",
    joinDate: new Date(),
    website: "https://github.com/abhiisdev7",
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="bg-popover rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-haspopup="dialog"
          aria-label={`${user.fullName} profile details`}
        >
          <Avatar className="rounded-sm" size="lg">
            <AvatarImage
              src={user.avatarUrl}
              alt={`${user.fullName}'s profile picture`}
              className="rounded-md"
            />
            <AvatarFallback aria-label={`Avatar fallback for ${user.fullName}`}>
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
            <AvatarBadge className="bg-primary" />
          </Avatar>
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        className="text-xs p-2 space-y-2"
        role="dialog"
        aria-label={`${user.fullName} Profile Card`}
        tabIndex={-1}
      >
        <div className="space-y-1">
          <h2 className="text-sm font-semibold" id="user-profile-title">
            {user.fullName}
          </h2>
          <p className="text-xs flex items-center">
            <Mail size={12} aria-hidden="true" className="inline mr-1" />
            <span className="sr-only">Email:</span>
            <a
              href={`mailto:${user.email}`}
              className="hover:underline focus:underline"
              aria-label={`Send email to ${user.fullName}`}
            >
              {user.email}
            </a>
          </p>
          <p className="text-xs flex items-center">
            <BriefcaseBusiness size={12} aria-hidden="true" className="inline mr-1" />
            <span>{user.jobTitle}</span>
          </p>
          <p className="text-xs flex items-center">
            <Globe size={12} aria-hidden="true" className="inline mr-1" />
            <Link
              href={user.website}
              className="hover:underline focus:underline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${user.fullName}'s website (opens in new tab)`}
            >
              {user.website}
            </Link>
          </p>
        </div>
        <p>{user.about}</p>
        <p>
          <span className="sr-only">Joined Date:</span>
          Joined:{" "}
          <time dateTime={user.joinDate?.toString()}>
            {new Date(user.joinDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}
