import { Heading } from "../../components/heading"
import MaxWidthWrapper from "../../components/max-width-wrapper"
import { Check } from "lucide-react"
import { ShinyButton } from "../../components/shiny-button"
import { MockDiscordUI } from "@/components/mock-discord-ui"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import { DiscordMessage } from "@/components/discord-message"

const Page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div>
              <Heading>
                <span>Real-Time SaaS Insights,</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
                  Delivered to Your Discord
                </span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              PingPanda is the easiest way to moitor your SaaS. Get instant
              notifications for
              <span className="font-semibold text-gray-700">
                {" "}
                sales, new users, or any other event{" "}
              </span>
              sent directly to your Discord.
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
              {[
                "Real-time Discord alerts for critial events",
                "Buy once use forever",
                "Track sales, new users, or any other event",
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Start For Free Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative bg-brand-25 pb-4">
        <div className="relative mx-auto" />
        <MaxWidthWrapper className="relative">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <MockDiscordUI>
              <AnimatedList>
                <DiscordMessage
                  avatarSrc="/brand-asset-profile-picture.png"
                  avatarAlt="PingPanda"
                  username="PingPang"
                  timestamp="Today at 12:35PM"
                  badgeText="SignUp"
                  badgeColor="#43b581"
                  title="👤 New user signed up"
                  content={{
                    name: "Amine Dev",
                    email: "aminedev@gmail.com",
                  }}
                />

                <DiscordMessage
                  avatarSrc="/brand-asset-profile-picture.png"
                  avatarAlt="PingPanda"
                  username="PingPang"
                  timestamp="Today at 12:35PM"
                  badgeText="Revenue"
                  badgeColor="#faa61a"
                  title="💲 Payment received"
                  content={{
                    amount: "$49.00",
                    email: "support@ebay.com",
                    plan: "PRO",
                  }}
                />
              </AnimatedList>
            </MockDiscordUI>
          </div>
        </MaxWidthWrapper>
      </section>
      <section></section>
      <section></section>
    </>
  )
}

export default Page
