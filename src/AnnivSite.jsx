import { useState, useEffect, useRef } from 'react'
import './anniv-site.css'

const name1 = "Karol"
const name2 = "Samantha"
const anniversaryDate = "2025-08-08"

const TimeLine = [
    {
        date: "First Date",
        title: "The First Time We Met",
        body: "Remember our first date at RESE? Both of us were so awkward and shy, but we managed to warm up and get comfortable while getting to know each other. Deep inside, I was feeling butterflies.",
    },
    {
        date: "A Hard Season",
        title: "I Almost Thought...",
        body: "Last year at July was a rollercoaster, I thought we weren't going to make it. But we did, by being patient with each other. I didn't want to lose you, I'm so grateful that we didn't give up.",
    },
    {
        date: "Day One",
        title: "The Day I Said Yes",
        body: "I still remember the day I've said yes to you. Until now, I always smile whenever I think about it. Seeing your reaction was priceless, I adored your smile.",
    },
    {
        date: "I Love You",
        title: "The First Time You Said I Love You",
        body: "We were at convention that time, walking around then you suddenly said it. I was surprised, my heart felt so warm and happy since you also said it in person. The smile on my face that day was so wide.",
    },
    {
        date: "The First Kiss",
        title: "The First Time We Kissed",
        body: "I was the one who initiated our first kiss, I couldn't do it right away because I was nervous. But when I finally gained confidence, my lips met yours. Just a peck, but it was sweet and full of love for you.",
    },
    {
        date: "Manila",
        title: "We Finally Went in Manila",
        body: "Our first time going to Manila with just the two of us, exploring the National Museums then Intramuros. It was memorable because we thought we won't be able to go home because of the sudden rain and traffic, but we did! It's always fun to be with you in times like those.",
    }, 
    {
        date: "Today",   
        title: "I Choose You",
        body: "I will choose you, Karol. I will always love you. In every lifetime and every universe, I won't hesitate to choose you. I see my future with you. I love you so much, and I cannot wait to marry you someday.", 
    },
];

const GalleryCount = 5;

const Letter = {
    greeting: "My Love",
    paragraph: ["Happy Anniversary, Karol! I am happy that we crossed paths and met each other, through being in a friend group that always plays Valorant, to being together as lovers.", 
                "You are a blessing to me. Thank you for always making me feel loved and seen, for being softspoken, and never failing on making me laugh. You are my other half, my best friend, and my partner in life.", 
                "I love you so much, Karol Joseph Faeldin. Cheers to more years of happiness together until we grow old, I cannot wait to live together and marry you. No more words can express my love for you, you're my solace."
    ],
    signature: "With all my love, Samantha",
}

const MonthsPerDay = 1000 * 60 * 60 * 24;
function useDayCounts(startDateStr) {
    const [daysTogether, setDaysTogether] = useState(0);
    const [daysToNext, setDaysToNext] = useState(0);
    const [sinceLabel, setSinceLabel] = useState("");

    useEffect(() => {
        const startDate = new Date(startDateStr + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const together = Math.max(Math.floor((today - startDate) / MonthsPerDay), 0);
        setDaysTogether(together);

        let nextAnniv = new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate());
        if (nextAnniv < today) {
            nextAnniv = new Date(today.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
        }
        setDaysToNext(Math.ceil((nextAnniv - today) / MonthsPerDay));

        setSinceLabel(
            "since " + startDate.toLocaleDateString("en-US",{ year: "numeric", month: "long", day: "numeric"})
        );
    }, [startDateStr]);
    return { daysTogether, daysToNext, sinceLabel };
}

function useCountUp(target, duration = 1400) {
    const [value, setValue] = useState(0);
    const rafRef = useRef(null);

    useEffect(()=>{
        let current = 0;
        const step = Math.max(Math.ceil(target / 60), 1);
        const stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 8);

        const tick = () => {
            current += step;
            if (current >= target) {
                setValue(target);
                return;
            }
            setValue(current)
            rafRef.current = setTimeout(tick, stepTime);
        }
        tick();

        return () => clearTimeout(rafRef.current)
    }, [target, duration]);

    return value;
}

function PhotoTile({index, src, alt}) {
    if (src) {
        return (
            <div className="polaroid polaroid--photo">
                <img src={src} alt={alt || `photo ${index + 1}`} /> 
            </div>
        );
    }
    return (
        <div className="polaroid">
            <span>photo {index + 1}</span>
        </div>
    )
}

export default function AnniversarySite() {
    const {daysTogether, daysToNext, sinceLabel} = useDayCounts(anniversaryDate);
    const animatedDaysTogether = useCountUp(daysTogether);
    const audioRef = useRef(null);
        const [isPlaying, setIsPlaying] = useState(false);

        const toggleMusic = () => {
            if (isPlaying) {
            audioRef.current.pause();
                } else {
            audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        };

    return (
        <>
        {/* ============ HERO ============ */}
        <section className="hero">
            <div className="eyebrow">a small archive of us</div>
                <h1>
                    <span>{name1}</span>
                    <span className="amp">&amp;</span>
                    <span>{name2}</span>
                </h1>
                <div className="counter-wrap">
                    <div className="counter">{animatedDaysTogether.toLocaleString()}</div>
                    <div className="counter-label">days of loving each other</div>
                </div>
                <div className="since-date">{sinceLabel}</div>
                <div className="scroll-hint" />
        </section>
        {/* ============ TIMELINE ============ */}
        <section>
            <div className="section-head">
                <div className="eyebrow">how it went</div>
                <h2>Our Timeline</h2>
            </div>
            <div className="timeline">
                {TimeLine.map((item, i)=> (
                    <div className="tl-item" key={i}>
                        <div className="tl-date">{item.date}</div>
                        <div className="tl-body">
                            <h3>{item.title}</h3>
                        <p>{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* ============ GALLERY ============ */}
        <section>
                <div className="section-head">
                <div className="eyebrow">favorite pictures of us</div>
                <h2>Cherished Moments</h2>
            </div>
            <div className="gallery-grid">
                <PhotoTile index={0} src="/photos/IMG_8008.jpg" alt="first sm on my bday" />
                <PhotoTile index={1} src="/photos/IMG_3185.jpg" alt="binondo valentines" />
                <PhotoTile index={2} src="/photos/DSCN0372.jpg" alt="sm with fam" />
                <PhotoTile index={3} src="/photos/DSCN0435.jpg" alt="my birthday" />
            </div>
            </section>

        {/* ============ LETTER ============ */}
        <section className="letter-section">
                <div className="section-head">
                    <div className="eyebrow">our lovely memories</div>
                    <h2>Here's to Us</h2>
                </div>
                <div className="letter-wrap">
                    <div className="letter-greeting">{Letter.greeting}</div>
                    <div className="letter-body">
                        {Letter.paragraph.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                    <div className="letter-sign">{Letter.signature}</div>
                </div>
                </section>

                {/* ============ NEXT ANNIVERSARY ============ */}
                <section className="next">
                    <div className="eyebrow">looking forward</div>
                    <h2>Next Anniversary</h2>
                    <div className="next-counter">{daysToNext.toLocaleString()}</div>
                    <div className="next-label">days to go</div>
                </section>
                <footer>made with love and effort, and coding it because it reminds me of you.</footer>

                {/* ============ MUSIC ============ */}
                <audio ref={audioRef} src="/music/song.mp3" loop />
                    <button className="music-toggle" onClick={toggleMusic}>
                        {isPlaying ? "♫ pause" : "♫ play music"}
                    </button>
        </>
    )
}