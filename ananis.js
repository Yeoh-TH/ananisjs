import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const allPages = Array.from({ length: 57 }, (_, i) => i + 1);

const fetchCourses = async (pageNumber) => {
    const url = `https://nusmods.com/courses?p=${pageNumber}&dept[0]=Economics&dept[1]=History`

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('li.BnMezp2M', { timeout: 10000 });

        const data = await page.evaluate(() => {
            const cards = document.querySelectorAll('li.BnMezp2M');
            return [...cards].map(card => {
                const spans = card.querySelectorAll('h2.sFrmN_8P a span');
                const courseCode = spans[0]?.innerText.trim() || '';
                const courseName = spans[1]?.innerText.trim() || '';
                const about = card.querySelector('header + p')?.innerText.trim() || '';
                return { courseCode, courseName, about };
            });
        })
        const filePath = path.join('courses', `${pageNumber}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Saved ${data.length} courses for ${pageNumber} to ${filePath}`);

        const html = await page.content();
        const htmlPath = path.join('html debug', `${pageNumber}.html`)
        fs.writeFileSync(htmlPath, html);

        return data;
    } catch (error) {
        console.error(`Error fetching ${pageNumber}:`, error.message);
        return [];
    } finally {
        await browser.close();
    }
}

const fetchAllCourses = async () => {
    console.log(`Starting to fetch all page number sfor term...`);

    // Ensure classes directory exists
    if (!fs.existsSync('courses')) {
        fs.mkdirSync('courses');
    }

    for (const pageNumber of allPages) {
        console.log(`Fetching ${pageNumber}...`);
        await fetchCourses(pageNumber);
        // Add a small delay to be respectful to the server
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Finished fetching all courses for Economics and History!');
}


fetchAllCourses();
