  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);
