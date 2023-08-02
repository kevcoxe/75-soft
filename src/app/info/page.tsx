
import Image from "next/image"
import Link from "next/link"
import { BsChevronDoubleDown } from "react-icons/bs"

export default function Page() {

  const image_w = 424
  const image_h = 424

  return (
    <div>

      <div className="min-h-screen hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="font-bold text-7xl">75 Soft</h1>
            <div className="flex flex-col font-light mt-80">
              <span>scroll to</span>
              <span>learn more</span>
              <span className="mt-2 animate-bounce">
                <BsChevronDoubleDown className="mx-auto font-light"/>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-3xl">
            <h1 className="text-lg font-bold text-center md:text-4xl">
              About 75 Soft
            </h1>

            <p className="py-6 text-lg text-start">
              The 75 Soft Challenge is the kinder, gentler alternative to TikTok&apos;s 75 Hard Challenge hardcore 75-day daily routine developed by Andy Frisella to “build mental strength and discipline”.
            </p>

            <p className="py-6 text-lg text-start">
              The 75 Hard Challenge preys on those who want to establish healthy habits, handing them a list of extreme lifestyle changes that could be a slippery slope for unhealthy restrictive behavior.
            </p>

            <p className="py-6 text-lg text-start">
              Thus, the 75 Soft Challenge was born. Like the hard version, the 75 Soft Challenge has a series of rules and guidelines that must be followed for 75 days to complete the challenge. The rules are designed to help you build healthy habits without extremes or restrictions.
            </p>
            <Link className="btn btn-neutral" href="/">Get Started</Link>
          </div>
        </div>
      </div>


      {/* Diet card */}
      <div className="min-h-screen hero bg-base-100">
        <div className="flex-col hero-content lg:flex-row">
          <Image alt="diet" width={image_w} height={image_h} src="/diet2.jpg" className="max-w-xs rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-lg font-bold text-center md:text-4xl">
              Eat Well and Save Drinking for Social Occasions
            </h1>

            <p className="py-6 text-lg text-start">
              The 75 Soft Challenge doesn&apos;t specify a strict diet, it simply needs to be healthy. The great thing about it is you can really set your own goals based on what &apos;eating well&apos; means to you.
            </p>

            <p className="py-6 text-lg text-start">
              For some that might mean counting calories or macros to dial in on specific nutrition goals. For others it might look like adding in more variety of fruits and vegetables or protein at each meal. For many, eating unhealthy foods on special occasions might be an integral part of a healthy diet. The important thing is that you set the boundaries for what healthy eating means for you and stick to it for the full 75 days.
            </p>

            <p className="py-6 text-lg text-start">
              When it comes to booze, the 75 Soft Challenge limits drinking for social occasions only. Don&apos;t use that as a green light to drink as much as you want. Stay mindful of how alcohol plays into your challenge. If one more drink is going to derail you from hitting your goals tomorrow, it&apos;s probably a good time to put the bottle down, right?
            </p>
          </div>
        </div>
      </div>

      {/* Water card */}
      <div className="min-h-screen hero bg-base-100">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <Image alt="water" width={image_w} height={image_h} src="/water1.jpg" className="max-w-xs rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-lg font-bold text-center md:text-4xl">
              Drink 3 Liters of Water a Day
            </h1>

            <p className="py-6 text-lg text-start">
              Drinking water might sound like the simplest task on the 75 Soft Challenge checklist, but it&apos;s probably the one you&apos;ll slip up on the most if you aren&apos;t intentional about it. 3 liters of water comes down to about 12 cups a day.
            </p>

            <p className="py-6 text-lg text-start">
              The last thing you want is for the end of the day to roll around, realize you forgot to drink your water, and feel the need to down it all right before bed. Our recommendation? Invest in a marked water bottle so you know exactly how much you&apos;re drinking throughout the day.
            </p>

            <p className="py-6 text-lg text-start">
              When your bottle needs a refill, use it as an opportunity to stand up from your desk, stretch your legs, and be social with your coworkers. Stacking a healthy habit like drinking water with other healthy habits is an easy way to build space for more healthy moments in your day.
            </p>

            <p className="py-6 text-lg text-start">
              If you&apos;re someone who easily gets tired of drinking water, try an electrolyte powder. Electrolytes help restore the minerals your cells need to thrive and function properly and can help you perform your best during a workout and recover better after a workout.
            </p>
          </div>
        </div>
      </div>

      {/* Reading card */}
      <div className="min-h-screen hero bg-base-100">
        <div className="flex-col hero-content lg:flex-row">
          <Image alt="read" width={image_w} height={image_h} src="/reading2.jpg" className="max-w-xs rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-lg font-bold text-center md:text-4xl">
              Read 10 Pages a Day
            </h1>

            <p className="py-6 text-lg text-start">
              Odds are you&apos;ve set a fitness or diet resolution before, but what about reading? Making time in your day to learn something new is excellent for the mind. Studies show reading can lower blood pressure, heart rate, and stress, and prevent cognitive decline as you age.
            </p>

            <p className="py-6 text-lg text-start">
              The 75 Hard Challenge requires you to read a self-help book, but the 75 Soft Challenge allows any book of your choosing. This is great news for someone like me, who spends my entire day on non-fiction research. Sitting down with a good fiction read is a breath of fresh air. No shame.
            </p>

            <p className="py-6 text-lg text-start">
              Once you&apos;ve chosen a book or two, you&apos;re excited to read, decide when you&apos;ll read. This is the easiest rule to fall off on if you&apos;re not intentional about it. Reading in the morning can set the tone for your day, reading at lunch is a nice escape from a running mind, and reading at night is a great way to relax before you fall asleep. There&apos;s no wrong time, just determine a time you like and stick to it.
            </p>
          </div>
        </div>
      </div>

      {/* Workout card */}
      <div className="min-h-screen hero bg-base-100">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <Image alt="workout" width={image_w} height={image_h} src="/workout2.jpg" className="max-w-xs rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-lg font-bold text-center md:text-4xl">
              Train for 45 Minutes Every Day
            </h1>

            <p className="py-6 text-lg text-start">
              When it comes to the 75 Series challenges, the workout portion of the programs tend to get the most attention, because it&apos;s the one rule that yields results that are easy to see.
            </p>

            <p className="py-6 text-lg text-start">
              For most of us, a daily 45-minute workout is more than we&apos;re already doing. The great thing about the workouts in 75 Soft is there are no guidelines for how or where you work out all the details are left up to you.
            </p>

            <p className="py-6 text-lg text-start">
              Want to stick to traditional cardio? Play pickleball? Go hiking, cycling, running? Lift weights? Hop in a dance cardio class? Do yoga? Use the SunnyFit® app? All is fair game. The only rule is that you move your body for 45 minutes a day, reserving one day a week for active rest.
            </p>

            <p className="py-6 text-lg text-start">
              Active rest essentially entails any low-impact, low-intensity activity like walking, swimming, or yoga. The point of active rest is to stay moving, which can help you stick to your new workout habit. Plus, it increases circulation to help pump fresh blood into your muscles and remove toxins like lactic acid which could contribute to muscle soreness.
            </p>
          </div>
        </div>
      </div>

      {/* Walk card */}
      <div className="min-h-screen hero bg-base-100">
        <div className="flex-col hero-content lg:flex-row">
          <Image alt="walk" width={image_w} height={image_h} src="/walk-on-beach.jpg" className="max-w-xs rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-lg font-bold text-center md:text-4xl">Walk</h1>

            <p className="py-6 text-lg text-start">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}