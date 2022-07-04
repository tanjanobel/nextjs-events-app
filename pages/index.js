import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <met
                    name="description"
                    content="Find a lot of great events that allow you to evolve..."
                />
            </Head>
            <NewsletterRegistration />
            <EventList items={props.events}/>
        </div>
    );
};

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800 // Regenerate Page every 1/2 hour
    }
}

export default HomePage;