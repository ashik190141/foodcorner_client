import React from 'react';
import chefImg from '../../../Image/chef.png';
import './Home.css';
import img1 from '../../../Image/dinner_recipe1.jpg';
import img2 from '../../../Image/dinner_recipe2.jpeg';
import img3 from '../../../Image/dinner_recipe3.jpeg';
import img4 from '../../../Image/dinner_recipe4.jpeg';
import Banner from './Banner';
import DevInfo from './DevInfo';
import SuccessStories from './SuccessStories';
import { useState } from 'react';
import { useEffect } from 'react';
import CountUp from "react-countup";

const Home = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/all-users")
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }, []);
    return (
      <div className="">
        <Banner></Banner>
        <div className="container mx-auto">
          <div className='pt-10'>
            <div className='flex gap-2 justify-center'>
              <div>Total Number of User: </div>
              <div>
                <CountUp end={user?.length} duration={5} />
              </div>
            </div>
            <SuccessStories></SuccessStories>
          </div>
          <section className="mt-20 md:p-0 p-3">
            <p className="text-4xl font-bold text-center">
              Popular Food Recipe
            </p>
            <p className="text-2xl text-justify mt-5">
              American food is a diverse and flavorful cuisine, influenced by a
              range of cultures and regional traditions. From classic comfort
              foods to creative fusions, American food offers a range of
              delicious options for every taste preference. In this article, we
              will explore a classic American recipe that has been a favorite
              for generations - macaroni and cheese. Macaroni and cheese is a
              dish that is loved by both kids and adults alike. This creamy and
              cheesy pasta dish has been a staple of American cuisine for over a
              century, and its easy to see why. The combination of pasta,
              cheese, and a creamy sauce creates a comforting and satisfying
              meal that is perfect for any occasion.
            </p>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-5 place-items-center mt-8">
              <img src={img1} alt="" className="region-img rounded-lg" />
              <img src={img2} alt="" className="region-img rounded-lg" />
              <img src={img3} alt="" className="region-img rounded-lg" />
              <img src={img4} alt="" className="region-img rounded-lg" />
            </div>
          </section>
          <section>
            <DevInfo></DevInfo>
          </section>
          <section className="mt-20 md:p-0 p-3">
            <p className="text-3xl font-bold text-center mb-5">
              Life style of a chef
            </p>
            <p className="text-xl md:text-center text-justify">
              The lifestyle of a chef can be both exciting and demanding, with
              long hours, high pressure, and a focus on creativity and
              innovation.
            </p>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-8">
              <div
                data-aos="fade-right"
                data-aos-duration="2000"
                className="border-2 border-indigo-600 rounded-xl p-3"
              >
                <p className="text-center text-3xl text-font">
                  Long Work Hours
                </p>
                <p className="mt-2 text-justify">
                  Chefs often work long hours, sometimes up to 12 hours or more
                  per day, including evenings, weekends, and holidays. This can
                  be physically and mentally exhausting, and can leave little
                  time for family and social life.
                </p>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="2000"
                className="border-2 border-indigo-600 rounded-xl p-3"
              >
                <p className="text-center text-3xl text-font">
                  Fast-paced and high-pressure environment
                </p>
                <p className="mt-2 text-justify">
                  Kitchens are often fast-paced and high-pressure environments,
                  with multiple tasks and orders to manage at once. This
                  requires chefs to be able to work quickly and efficiently
                  under pressure.
                </p>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="2000"
                className="border-2 border-indigo-600 rounded-xl p-3"
              >
                <p className="text-center text-3xl text-font">
                  Physical demands
                </p>
                <p className="mt-2 text-justify">
                  Chefs must be able to handle the physical demands of the job,
                  including standing for long periods of time, working with hot
                  and sharp equipment, and carrying heavy pots and pans.
                </p>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="2000"
                className="border-2 border-indigo-600 rounded-xl p-3"
              >
                <p className="text-center text-3xl text-font">
                  Attention to detail
                </p>
                <p className="mt-2 text-justify">
                  Chefs must have a high level of attention to detail in order
                  to create dishes that are not only delicious but visually
                  appealing as well. This requires a keen eye for presentation
                  and a willingness to experiment with new ingredients and
                  techniques.
                </p>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="2000"
                className="border-2 border-indigo-600 rounded-xl p-3"
              >
                <p className="text-center text-3xl text-font">Creativity</p>
                <p className="mt-2 text-justify">
                  Chefs must be creative and innovative in order to stand out in
                  a highly competitive industry. They must be able to experiment
                  with new flavors and techniques, and stay up-to-date with the
                  latest culinary trends.
                </p>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="2000"
                className="border-2 border-indigo-600 rounded-xl p-3"
              >
                <p className="text-center text-3xl text-font">
                  Passion for food
                </p>
                <p className="mt-2 text-justify">
                  Chefs must have a deep passion for food and cooking in order
                  to be successful. They must be willing to put in the time and
                  effort to constantly improve their craft, and be able to
                  handle the stress and demands of the job.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
};

export default Home;