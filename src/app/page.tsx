
import Image from "next/image"
import Link from "next/link"
import { BsChevronDoubleDown } from "react-icons/bs"

export default function Page() {

  const image_w = 424
  const image_h = 424

  const APP_PATH = "/app"

  return (
    <div>

      <div className="min-h-screen hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="font-bold text-7xl">75 Soft</h1>

            <p className="py-6 text-lg text-center">
              The more compassionate and approachable alternative to TikTok&apos;s 75 Hard Challenge.
            </p>

            <div className="flex flex-col mt-64 font-light">
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
              The 75 Soft Challenge offers a more compassionate and approachable alternative to TikTok&apos;s 75 Hard Challenge, which is known for its rigorous 75-day routine created by Andy Frisella to &quot;build mental strength and discipline&quot;.
            </p>

            <p className="py-6 text-lg text-start">
              Unlike the 75 Hard Challenge, which may lead individuals towards unhealthy restrictive habits, the 75 Soft Challenge caters to those seeking to adopt healthier practices. It presents a set of rules and guidelines to be adhered to for 75 days to successfully accomplish the challenge. These rules are thoughtfully crafted to encourage the development of positive habits without resorting to extreme measures or strict limitations.
            </p>

            <Link className="btn btn-neutral" href={APP_PATH}>Get Started</Link>
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
              The beauty of the 75 Soft Challenge lies in its flexibility concerning diet - it does not impose strict dietary guidelines but rather encourages participants to opt for healthy choices. The remarkable aspect is that individuals can define their own goals based on their interpretation of &quot;eating well.&quot;
            </p>

            <p className="py-6 text-lg text-start">
              For some, this might involve meticulous calorie or macro counting to achieve specific nutritional objectives. Others may focus on incorporating a wider range of fruits, vegetables, or protein in each meal. For many, enjoying occasional indulgences might still be considered a part of maintaining a balanced diet. The key is to establish personalized boundaries for healthy eating and adhere to them throughout the entire 75-day duration.
            </p>

            <p className="py-6 text-lg text-start">
              Regarding alcohol consumption, the 75 Soft Challenge restricts drinking to social occasions only. However, it&apos;s essential to exercise mindfulness and not interpret this as a green light for excessive drinking. Participants should be aware of how alcohol affects their progress in the challenge. If consuming an additional drink might hinder them from reaching their goals the next day, it&apos;s wise to exercise restraint and refrain from further indulgence.
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
              Staying hydrated by drinking water may seem like a simple task in the 75 Soft Challenge checklist, but it can be surprisingly challenging to maintain if not approached with intention. Consuming 3 liters of water daily, equivalent to around 12 cups, requires conscious effort.
            </p>

            <p className="py-6 text-lg text-start">
              To avoid the last-minute rush to meet your water intake, consider investing in a marked water bottle that allows you to track your consumption throughout the day accurately.
            </p>

            <p className="py-6 text-lg text-start">
              Whenever your water bottle needs a refill, use it as an opportunity to take a short break from your desk, stretch your legs, and engage with your colleagues. Integrating the habit of drinking water with other healthy behaviors creates space for more wellness moments in your daily routine.
            </p>

            <p className="py-6 text-lg text-start">
              For those who find plain water monotonous, incorporating an electrolyte powder can be beneficial. Electrolytes aid in replenishing the essential minerals your cells need to function optimally, supporting better performance during workouts and aiding in post-workout recovery. By using electrolyte supplements, you can enhance your overall well-being and achieve your best potential during physical activities.
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
              Chances are you&apos;ve made fitness or diet resolutions in the past, but have you considered setting one for reading? Carving out time in your day to learn something new through reading is not only enriching but also highly beneficial for your mind. Research indicates that reading can lead to lower blood pressure, heart rate, and stress levels, while also helping to prevent cognitive decline as you age.
            </p>

            <p className="py-6 text-lg text-start">
              While the 75 Hard Challenge mandates reading a self-help book, the 75 Soft Challenge allows you the freedom to choose any book you prefer. This flexibility is especially welcome for individuals like myself, who spend the entire day engrossed in non-fiction research. Taking a moment to immerse oneself in a good fiction book feels like a refreshing change of pace, and there&apos;s absolutely no shame in indulging in that pleasure.
            </p>

            <p className="py-6 text-lg text-start">
              After selecting one or two books that excite you, it&apos;s crucial to decide on a designated time for reading. This aspect is easy to overlook, but being intentional about it is vital to remain consistent. Reading in the morning can set a positive tone for the day, while reading during lunch provides a pleasant escape from the constant stream of thoughts. On the other hand, reading at night can be a great way to unwind and relax before falling asleep. There&apos;s no wrong time to read; the key is to determine a time that suits your preferences and stick to it diligently.
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
              When discussing the 75 Series challenges, the workout component tends to receive the most attention, as it is the rule that yields visible results and improvements.
            </p>

            <p className="py-6 text-lg text-start">
              For many of us, committing to a daily 45-minute workout is already a significant step forward. The beauty of the workouts in the 75 Soft Challenge lies in their flexibility, as there are no strict guidelines on how or where you should exercise—all the details are left up to your preference.
            </p>

            <p className="py-6 text-lg text-start">
              You have the freedom to choose the type of workout that suits you best. Whether you prefer traditional cardio, playing pickleball, hiking, cycling, running, weightlifting, dance cardio classes, yoga, everything is fair game. The only requirement is that you engage in physical activity for 45 minutes each day, with one day a week designated for active rest.
            </p>

            <p className="py-6 text-lg text-start">
              Active rest involves participating in low-impact, low-intensity activities like walking, swimming, or yoga. The purpose of active rest is to keep your body in motion, which not only helps you adhere to your new workout routine but also boosts circulation, ensuring fresh blood is pumped into your muscles and toxins like lactic acid are removed, reducing muscle soreness and aiding in recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Walk card */}
      <div className="min-h-screen hero bg-base-100">
        <div className="flex-col hero-content lg:flex-row">
          <Image alt="walk" width={image_w} height={image_h} src="/walk-on-beach.jpg" className="max-w-xs rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-lg font-bold text-center md:text-4xl">
              Walk 1 mile a day
            </h1>

            <p className="py-6 text-lg text-start">
            In the 75 Soft Challenge, participants are encouraged to take on the feat of walking 75 miles within a span of 75 days. The challenge revolves around striving to complete a 1-mile walk each day, but it offers the flexibility to make up for missed days if necessary. This means that if unforeseen circumstances arise or life gets hectic, individuals have the opportunity to catch up on their progress and stay on track with their walking goal. Embracing this aspect of the challenge not only promotes physical activity but also emphasizes the importance of perseverance and adaptability in achieving one&apos;s fitness objectives.
            </p>

            <p className="py-6 text-lg text-start">
              Incorporating a daily 1-mile walk into your routine can yield remarkable health benefits, despite its simplicity. This low-impact exercise offers an effective means to enhance overall well-being. By regularly walking, you can manage weight and support weight loss when complemented with a balanced diet. Moreover, it fosters cardiovascular health, reducing the risk of heart disease, high blood pressure, and stroke. The positive impact extends to lung function and circulation, promoting better oxygen supply to body tissues and organs.
            </p>

            <p className="py-6 text-lg text-start">
              Beyond the physical advantages, walking also contributes to mental well-being. Engaging in a daily walk stimulates the release of endorphins, natural mood enhancers that alleviate stress, anxiety, and depression. It serves as a tranquil opportunity to relax, clear the mind, and bask in the outdoors, fostering a more positive outlook on life. Additionally, regular walking strengthens bones and muscles, improving joint flexibility and stability. Embracing the simple yet potent habit of walking 1 mile each day can make a profound difference in your overall health and vitality.
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-3xl">
            <h1 className="text-lg font-bold text-center md:text-4xl">
              Ready to start?
            </h1>

            <p className="py-6 text-lg text-start">
            Are you ready to embrace the transformative journey of the 75 Soft Challenge? Unlock your full potential, challenge yourself, and witness incredible growth as you embark on this empowering path towards a healthier, happier you. Join the community of like-minded individuals, and together, let&apos;s conquer the 75 Soft Challenge and redefine what&apos;s possible for ourselves!
            </p>

            <Link className="btn btn-neutral" href={APP_PATH}>Let&apos;s go!</Link>
          </div>
        </div>
      </div>

    </div>
  )
}
