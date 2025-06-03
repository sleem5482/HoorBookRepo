import Link from "next/link";
import { Button } from "../ui/Button";
import Image from "next/image";
export default function ProductNews() {
  const cards = [
    {
      url: "/asset/images/Blog image.svg",
      title: "Product Mail is taking on Gmail by betting on privacy",
      description:
        "Ramet consectetur. Est porttitor mattis pharetra sit id viverra. Vivamus mauris augue pharetra cras turpis faucibus elit urna.",
      date: "Feb 8, 2023",
    },
    {
      url: "/asset/images/Blog image2.svg",
      title: "Wants You To Sign Out Of Google Workspace Forever",
      description:
        "Est porttitor mattis pharetra sit id viverra. Vivamus mauris augue pharetra cras turpis faucibus elit urna.",
      date: "Feb 8, 2023",
    },
    {
      url: "/asset/images/Blog image3.svg",
      title: "The Best Email Encryption Services for 2023",
      description:
        "Dorttitor mattis pharetra sit id viverra. Vivamus mauris augue pharetra cras turpis faucibus elit urna.",
      date: "Feb 8, 2023",
    },
  ];

  return (
    <section className="bg-main-color">
      <div className="container mx-auto p-4 flex flex-col justify-center">
        <div className="news_title_with_btn flex justify-around gap-72  items-center mb-8">
            <div className="title_new">
              <h3 className="bg-text-gradient bg-clip-text text-5xl font-semibold text-transparent">
                Product in the news
              </h3>
            </div>
            <div className="btn">
              <Button theme="primary">Browse all news</Button>
            </div>
          </div>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card, index) => (
            <article
              key={index}
              className="w-full sm:w-[392px] bg-card-color border-[1px] border-border-color rounded-lg shadow-md"
            >
              <div className="card p-3 flex items-center flex-col">
                <figure className="card_image">
                  <Image
                    src={card.url}
                    width={342}
                    height={200}
                    alt={card.title}
                  />
                  <figcaption className="sr-only">{card.title}</figcaption>
                </figure>
                <div className="card_content p-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">{card.title}</h3>
                  <p className="bg-text-gradient bg-clip-text text-left text-[14px] text-transparent">
                    {card.description}
                  </p>
                </div>
                <footer className="read_more border-t-[1px] border-border-color w-full p-4 flex justify-between">
                  <time className="text-[14px] text-paragraph-color" dateTime="2023-02-08">
                    {card.date}
                  </time>
                  <div className="btn text-white">
                    <Link href={'/'}>
                      Read more &#8594;
                    </Link>
                    
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}