import classes from './NewProduct.module.css';
import downloadIco from '../../assets/download-ico.png';
import cameraIco from '../../assets/camera-icon.png';

export default function NewProductDescription() {
  return (
    <div className={classes['box']}>
      <h2>Опис</h2>
      <textarea
        name="description"
        id="description"
        className={classes.description}
        rows={8}
        placeholder="Якомога детальніше розкажіть про свій товар..."
      ></textarea>
    </div>
  );
}
