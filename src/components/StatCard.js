import {
    Card,
    CardContent,
    Box,
    Typography,
} from "@mui/material";

function StatCard({ title, value, icon, color, description }) {
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 2.5 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {title}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            backgroundColor: `${color}18`,
                            color: color,
                        }}
                    >
                        {icon}
                    </Box>
                </Box>

                <Typography variant="h4" fontWeight={700}>
                    {value}
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default StatCard;