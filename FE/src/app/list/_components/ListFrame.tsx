  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [mobile, setMobile] = useState(false);
  const handleCreate = () => {
    mobile ? router.push("/create") : router.push("/list");
  };
  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);
