## Plan: Convert Dashboard Preview into a Carousel

### What we're changing
The right-hand side of the **Product** section (`/html/body/div[2]/main/section[4]/div/div[2]`) currently renders the static `<DashboardPreview />` mockup. We will wrap it in a horizontal carousel so you can swipe/scroll between the dashboard preview and additional images/media you'll add later.

### Why this approach
- The project already ships `embla-carousel-react` and a styled `Carousel` component (`src/components/ui/carousel.tsx`). Re-using it keeps dependencies zero and styling consistent.
- The default `CarouselPrevious`/`CarouselNext` arrows position themselves *outside* the container (`-left-12` / `-right-12`). In the current `lg:grid-cols-2` layout there is no margin for external arrows, so we will use **bottom dot indicators** instead. They sit inside the carousel area, look cleaner with a dark dashboard mockup, and scale better on mobile.

### Implementation steps

1. **Carousel wrapper**
   - Import `Carousel`, `CarouselContent`, `CarouselItem` from `@/components/ui/carousel` in `src/routes/index.tsx`.
   - In the `Product` section, replace the direct `<DashboardPreview />` call with a `<Carousel>` block.

2. **Slides**
   - **Slide 1:** the existing `<DashboardPreview />` component.
   - **Slide 2+:** leave ready-to-use `<CarouselItem>` slots with placeholder styling so you can drop in images or video later.

3. **Dot navigation**
   - Use the `setApi` prop on `<Carousel>` to capture the Embla API.
   - Build a small local dot bar (4–5 dots, `size-2` circles) positioned absolutely at the bottom center of the carousel, overlapping the slide content with a subtle backdrop so they remain legible over both the dark dashboard and bright photos.
   - Dots use the `ocean` / `ocean-deep` color tokens when active and `white/40` when inactive.

4. **Layout preservation**
   - The outer `Product` section keeps its `lg:grid-cols-2` layout (text left, carousel right).
   - No changes to orientation, section order, or responsive breakpoints.

5. **Touch / keyboard**
   - Horizontal swipe works on mobile out of the box via Embla.
   - Arrow-key navigation remains enabled via the carousel's built-in `onKeyDownCapture` handler.

### After the change
You will be able to:
- Swipe/click dots to move between the dashboard preview and future media slides.
- Add new slides by wrapping any image or component in another `<CarouselItem>`.