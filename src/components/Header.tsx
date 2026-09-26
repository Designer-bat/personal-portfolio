"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";

import { Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, work, gallery, contact } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

export const Header = ({ currentTime }: { currentTime: string }) => {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Row
          fitHeight
          className={`${styles.position} ${scrolled ? styles.scrolled : ""}`}
          position="fixed"
          as="header"
          fillWidth
          horizontal="center"
          data-border="rounded"
        >
        <motion.div
          className={styles.progress}
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {contact && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="email"
                      href={contact.path}
                      label={contact.label}
                      selected={
                        pathname === "/" && (typeof window !== "undefined" ? window.location.hash === "#contact" : false)
                      }
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="email"
                      href={contact.path}
                      selected={
                        pathname === "/" && (typeof window !== "undefined" ? window.location.hash === "#contact" : false)
                      }
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="0"
          >
            <Flex s={{ hide: true }}>
              {display.time && currentTime}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
