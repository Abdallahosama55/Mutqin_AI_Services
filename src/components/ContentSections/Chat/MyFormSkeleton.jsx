import { Button, Box, Skeleton, Stack } from "@mui/material";

export default function MyFormSkeleton({ children, ...prop }) {
  return (
    <Stack
      gap={{ xs: 1, md: 3 }}
      alignItems={"center"}
      justifyContent={"space-between"}
      height={"100%"}
      width={"100%"}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"start"}
        gap={2}
        sx={{ width: "100%", mb: 2 }}
      >
        <Skeleton variant="rounded" width={50} height={50} />
        <Box width="100%">
          <Skeleton
            variant="rounded"
            height={10}
            sx={{ mb: 1, maxWidth: 300, width: "30%" }}
          />
          <Skeleton
            variant="rounded"
            height={40}
            sx={{ maxWidth: 300, width: "100%" }}
          />
        </Box>
      </Stack>
      <Stack sx={{ width: "100%", gap: { xs: 1, md: 2 } }}>
        {Array(4)
          .fill(0)
          .map((i, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width="100%"
              sx={{ height: { xs: 25, md: 40 } }}
            />
          ))}
      </Stack>
      <Skeleton
        variant="rounded"
        sx={{
          height: { xs: 30, md: 45 },
          borderRadius: "10px",
          mt: 2,
          width: { xs: "50%", md: "40%" },
        }}
      />
    </Stack>
  );
}
