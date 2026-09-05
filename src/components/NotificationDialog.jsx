import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const NotificationDialog = ({ open, onClose, message, isSuccess }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      // Thêm sx để làm bo tròn góc giống style của thẻ Card
      PaperProps={{
        sx: { borderRadius: "12px", padding: "8px", minWidth: "320px" },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: isSuccess ? "#00b14f" : "#d32f2f",
        }}
      >
        {isSuccess ? "Thành công" : "Thông báo lỗi"}
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body1" sx={{ color: "#333", mt: 1 }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: isSuccess ? "#00b14f" : "#d32f2f",
            borderRadius: "999px",
            px: 4,
            textTransform: "none",
            "&:hover": { background: isSuccess ? "#009643" : "#b71c1c" },
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;
