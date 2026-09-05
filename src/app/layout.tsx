import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  Background,
  Column,
  Flex,
  Meta,
  opacity,
  RevealFx,
  SpacingToken,
} from "@once-ui-system/core";

import {
  Footer,
  Header,
  RouteGuard,
  Providers,
} from "@/components";

import {
  baseURL,
  effects,
  style,
  dataStyle,
  home,
  person,
} from "@/resources";


export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang={person.locale ?? "en"}
      fillWidth
      className={classNames(
        "font-heading",
        "font-body",
        "font-label",
        "font-code",
      )}
    >
      <head>
        <script
          id="theme-init"
        >{`
              (function () {
                try {
                  const root = document.documentElement;

                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};

                  Object.entries(config).forEach(([key, value]) => {
                    if (value) {
                      root.setAttribute(
                        "data-" + key,
                        String(value)
                      );
                    }
                  });

                  const resolveTheme = (themeValue) => {
                    if (
                      !themeValue ||
                      themeValue === "system"
                    ) {
                      return window.matchMedia(
                        "(prefers-color-scheme: dark)"
                      ).matches
                        ? "dark"
                        : "light";
                    }

                    return themeValue;
                  };

                  const savedTheme =
                    localStorage.getItem("data-theme");

                  const resolvedTheme =
                    resolveTheme(savedTheme);

                  root.setAttribute(
                    "data-theme",
                    resolvedTheme
                  );

                  Object.keys(config).forEach((key) => {
                    const value =
                      localStorage.getItem(
                        "data-" + key
                      );

                    if (value) {
                      root.setAttribute(
                        "data-" + key,
                        value
                      );
                    }
                  });
                } catch (error) {
                  console.error(
                    "Failed to initialize theme:",
                    error
                  );

                  document.documentElement.setAttribute(
                    "data-theme",
                    "dark"
                  );
                }
              })();
            `}</script>
      </head>

      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          horizontal="center"
          margin="0"
          padding="0"
          style={{
            minHeight: "100vh",
            width: "100%",
            overflowX: "hidden",
          }}
        >

          {/* Background effects */}
          <RevealFx
            fill
            position="absolute"
          >
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}

              gradient={{
                display: effects.gradient.display,
                opacity:
                  effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart:
                  effects.gradient.colorStart,
                colorEnd:
                  effects.gradient.colorEnd,
              }}

              dots={{
                display: effects.dots.display,
                opacity:
                  effects.dots.opacity as opacity,
                size:
                  effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}

              grid={{
                display: effects.grid.display,
                opacity:
                  effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}

              lines={{
                display: effects.lines.display,
                opacity:
                  effects.lines.opacity as opacity,
                size:
                  effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </RevealFx>


          {/* Top spacing */}
          <Flex
            s={{ hide: true }}
            style={{
              height: "64px",
              width: "100%",
            }}
          />


          {/* Header */}
          <Header />


          {/* Main content */}
          <Flex
            fillWidth
            flex={1}
            horizontal="center"
            zIndex={0}
            style={{
              width: "100%",
              minWidth: 0,
              padding: "0 24px",
            }}
          >
            <Flex
              fillWidth
              horizontal="center"
              minHeight="0"
              style={{
                width: "100%",
                maxWidth: "1440px",
                minWidth: 0,
              }}
            >
              <RouteGuard>
                {children}
              </RouteGuard>
            </Flex>
          </Flex>


          {/* Footer */}
          <Footer />

        </Column>
      </Providers>
    </Flex>
  );
}